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
