#!/bin/sh

# Install Ansible
echo "Installing Absible"
pip install git+https://github.com/ansible/ansible.git@devel

# Set up Ansible playbook and related files
echo "Downloading files from platform git repo"
git clone https://github.com/Etheroscope/platform.git
echo "Assembling Ansible playbooks"
ls
ls platform
mv platform/ansible .
ls platform
ls
cp -R ansible-additions/. ansible
ls ansible

# Set up SSH private key
echo "Decrypting uploaded private key"
openssl aes-256-cbc -K $encrypted_da743b78d4e1_key -iv $encrypted_da743b78d4e1_iv -in deploy_rsa.enc -out /tmp/deploy_rsa -d
echo "Adding SSH private key"
eval "$(ssh-agent -s)"
chmod 600 /tmp/deploy_rsa
sudo ssh-add /tmp/deploy_rsa
