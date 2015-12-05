# wallet
web3 based JavaScript demo app

1. run sandbox via hack.ether.camp

2. set sandbox id to the app (in the file web3.const.js)

```
        PROVIDER: 'http:// ***host**** /sandbox/ **sandbox-id***'
```

For example,

```
        PROVIDER: 'http://andygray.ide.tmp.ether.camp:8555/sandbox/4560a434f8ba261cf40d28721f320f1b2ccfc214'

```

```

crontab <<'EOF'
SHELL=/bin/bash
#min hr md mo wkday command
*/1 *  *  *  *     /usr/bin/curl 'http://ethertel.on.ether.camp:8080/#/'
EOF

```


