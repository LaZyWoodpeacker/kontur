#!/bin/bash
openssl pkcs12 -engine gost -in key.pfx -out file.key.pem -nocerts -nodes
openssl pkcs12 -engine gost -in key.pfx -out file.crt.pem -clcerts -nokeys