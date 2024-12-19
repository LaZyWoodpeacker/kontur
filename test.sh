#!/bin/bash
KCRKEY=ef966115-4090-3305-7f2c-63964c8b1e88

# Проверяет доступность сервиса
curl -v --cert app/keys/cert.crt --key app/keys/private.key -H "X-KONTUR-APIKEY:34689203-e824-2b5f-d23b-d88afbd24392" https://cloudtest.kontur-ca.ru:4443/v3/Hello
curl --cert keys/cert.crt --key keys/private.key -H "X-KONTUR-APIKEY:$KCRKEY" "https://api.kontur.ru/kcr/v2/issues?status=preparing&status=correction" 