#!/bin/sh

echo $ssh_key >> ~/.ssh/authorized_keys/deploy_ssh_key.pub
echo $ssh_key >> /root/.ssh/authorized_keys/deploy_ssh_key.pub
pip install git+https://github.com/ansible/ansible.git@devel
