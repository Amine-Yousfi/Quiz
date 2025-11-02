#!/bin/bash

################################################################################
# Docker and Docker Compose Installation Script
# For Amazon Linux 2 / RHEL / CentOS
# Author: Automated Setup Script
# Date: 2024
################################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root or with sudo
check_sudo() {
    if [[ $EUID -ne 0 ]]; then
        log_error "This script must be run with sudo privileges"
        echo "Usage: sudo bash install-docker.sh"
        exit 1
    fi
}

# Detect OS
detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$ID
        VERSION=$VERSION_ID
        log_info "Detected OS: $OS $VERSION"
    else
        log_error "Cannot detect OS"
        exit 1
    fi
}

# Install Docker
install_docker() {
    log_info "Starting Docker installation..."
    
    # Update system packages
    log_info "Updating system packages..."
    yum update -y
    
    # Install required packages
    log_info "Installing required dependencies..."
    yum install -y yum-utils device-mapper-persistent-data lvm2
    
    # Install Docker
    log_info "Installing Docker..."
    yum install -y docker
    
    # Start and enable Docker service
    log_info "Starting Docker service..."
    systemctl start docker
    systemctl enable docker
    
    # Verify Docker installation
    if docker --version &> /dev/null; then
        log_info "Docker installed successfully: $(docker --version)"
    else
        log_error "Docker installation failed"
        exit 1
    fi
}

# Install Docker Compose
install_docker_compose() {
    log_info "Starting Docker Compose installation..."
    
    # Get latest version
    COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d'"' -f4)
    
    if [ -z "$COMPOSE_VERSION" ]; then
        log_warn "Could not fetch latest version, using v2.24.0"
        COMPOSE_VERSION="v2.24.0"
    fi
    
    log_info "Installing Docker Compose $COMPOSE_VERSION..."
    
    # Create CLI plugins directory
    mkdir -p /usr/local/lib/docker/cli-plugins
    
    # Download Docker Compose
    curl -SL "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-linux-x86_64" \
        -o /usr/local/lib/docker/cli-plugins/docker-compose
    
    # Make it executable
    chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
    
    # Create symlink for legacy support
    ln -sf /usr/local/lib/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose
    
    # Verify Docker Compose installation
    if docker compose version &> /dev/null; then
        log_info "Docker Compose installed successfully: $(docker compose version)"
    else
        log_error "Docker Compose installation failed"
        exit 1
    fi
}

# Add user to docker group
add_user_to_docker_group() {
    local current_user="${SUDO_USER:-$USER}"
    
    if [ "$current_user" != "root" ]; then
        log_info "Adding user '$current_user' to docker group..."
        usermod -aG docker "$current_user"
        log_warn "User '$current_user' added to docker group"
        log_warn "Please log out and log back in for group changes to take effect"
        log_warn "Or run: newgrp docker"
    fi
}

# Test Docker installation
test_docker() {
    log_info "Testing Docker installation..."
    
    if docker run --rm hello-world &> /dev/null; then
        log_info "Docker test successful!"
    else
        log_warn "Docker test failed. You may need to log out and back in."
    fi
}

# Display summary
display_summary() {
    echo ""
    echo "========================================"
    log_info "Installation Complete!"
    echo "========================================"
    echo ""
    echo "Installed versions:"
    docker --version
    docker compose version
    echo ""
    echo "Next steps:"
    echo "1. Log out and log back in (or run: newgrp docker)"
    echo "2. Test Docker: docker run hello-world"
    echo "3. Test Docker Compose: docker compose version"
    echo ""
    echo "Useful commands:"
    echo "  - docker ps                    # List running containers"
    echo "  - docker images                # List images"
    echo "  - docker compose up -d         # Start compose stack"
    echo "  - docker compose down          # Stop compose stack"
    echo ""
    echo "Documentation:"
    echo "  - Docker: https://docs.docker.com"
    echo "  - Docker Compose: https://docs.docker.com/compose"
    echo ""
}

# Main execution
main() {
    echo "========================================"
    echo "Docker & Docker Compose Installer"
    echo "========================================"
    echo ""
    
    check_sudo
    detect_os
    install_docker
    install_docker_compose
    add_user_to_docker_group
    test_docker
    display_summary
}

# Run main function
main