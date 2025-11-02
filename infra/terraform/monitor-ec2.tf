resource "aws_instance" "monitor-server" {
  ami                    = "ami-0bdd88bd06d16ba03"
  instance_type          = "t3.small"
  tags = {
    Name        = "monitor-server"
    Description = "Monitoring instance"
  }
  key_name               = aws_key_pair.monitor.id
  vpc_security_group_ids = [ aws_security_group.monitor-ssh-access.id ]
}

resource "aws_key_pair" "monitor" {
  key_name   = "monitor" 
  public_key = file("${path.module}/ssh/web.pub")
}

resource "aws_security_group" "monitor-ssh-access" {
  name        = "monitor-ssh-access"
  description = "Allow SSH access from the Internet"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" 
    cidr_blocks = ["0.0.0.0/0"] 
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}


