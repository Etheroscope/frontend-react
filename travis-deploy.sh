#!/bin/sh
cd ansible
ansible-playbook playbook.yml -i inventory -vvv
