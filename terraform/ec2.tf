# Data source to get AMI details
data "aws_ami" "selected" {
  owners = ["self", "amazon"]
  
  filter {
    name   = "image-id"
    values = ["ami-0bdd88bd06d16ba03"]
  }
}

# Local variable to determine username based on AMI name
locals {
  ami_name = data.aws_ami.selected.name
  
  # Determine username based on AMI name patterns
  default_user = (
    can(regex("ubuntu", lower(local.ami_name))) ? "ubuntu" :
    can(regex("amzn|amazon", lower(local.ami_name))) ? "ec2-user" :
    can(regex("rhel|red.*hat", lower(local.ami_name))) ? "ec2-user" :
    can(regex("debian", lower(local.ami_name))) ? "admin" :
    can(regex("centos", lower(local.ami_name))) ? "centos" :
    can(regex("suse", lower(local.ami_name))) ? "ec2-user" :
    "ec2-user"  # default fallback
  )
}

resource "aws_instance" "webserver" {
  ami                    = "ami-0bdd88bd06d16ba03"
  instance_type          = "t3.small"
  tags = {
    Name        = "webserver"
    Description = "An Nginx WebServer on Ubuntu"
  }
  user_data = <<-EOF
    #!/bin/bash
    sudo apt update
    sudo apt install nginx -y
    systemctl enable nginx
    systemctl start nginx
  EOF
  key_name               = aws_key_pair.web.id
  vpc_security_group_ids = [ aws_security_group.ssh-access.id ]
}

resource "aws_key_pair" "web" {
  key_name   = "web"  # Add this line to specify the name
  public_key = file("${path.module}/ssh/web.pub")
}

resource "aws_security_group" "ssh-access" {
  name        = "ssh-access"
  description = "Allow SSH access from the Internet"
  
  # SSH
  # ingress {
  #   from_port   = 22
  #   to_port     = 22
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  # # Argo CD
  # ingress {
  #   from_port   = 8080
  #   to_port     = 8080
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  # ingress {
  #   from_port   = 31732
  #   to_port     = 31732
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  # # Allow all outbound traffic
  # ingress {
  #   from_port   = 6443
  #   to_port     = 6443
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # Represents all protocols
    cidr_blocks = ["0.0.0.0/0"] # Represents all IP addresses
  }

   # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}


# Create the Ansible inventory file with dynamic username
resource "local_file" "ansible_inventory" {
  content = <<EOT
[webservers]
${aws_instance.webserver.public_ip} ansible_user=${local.default_user} ansible_ssh_private_key_file=./ssh/web

[webservers:vars]
ansible_ssh_common_args='-o StrictHostKeyChecking=no'
EOT
  filename = "/mnt/c/Users/Amine/Desktop/Quiz/ansible/inventory.ini"
}

output "webserver_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.webserver.public_ip
}

output "ami_username" {
  description = "Default username for the AMI"
  value       = local.default_user
}