# create ssh

```sh
cd tools/ssh
docker run --rm -v $PWD:/out -e HOST=localhost -e IP=127.0.0.1 tkuni83/self-sign-cert
```
