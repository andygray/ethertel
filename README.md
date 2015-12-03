# ethertel

Telephony exchange to enable micro-payment telephone calls around the world. Providers can lock international rate cards into smart-contracts and the end-users only ever pay for exact amount of the call!

## Browser Voip Client

Simple payphone web based voip client: 

* A user can enter their seed password in the client to sign into their Ethereum account. This will need a balance > 0 to make telephone calls (to landlines/mobiles)
* User only pays for the call, they enter a (international/local) telephone number and estimated minutes and will receive an quote in ether (based on the best rate on the exchange). They can then place the call and send the required ether. Once the call completes the client will be informed of the cost and refunded any unused ether.
* User can see previous transactions made. Call Number/Call Duration/Call Cost/Call Rate

User can use normal ethereum wallet to fund account and calls.

## Rate Exchange

* Show the current best rates to destinations
* Show previous transactions (i.e. calls)
* Show historic rates and price flucations
* Call cost estimator
* Show dial plan for destinations

## Provider Back-office

* Provider can enter their seed password in the client to sign into their (Provider) Ethereum account. They can see their balance of calls that have been placed with them.
* Provider can submit/edit rate cards to destinations in ether
* Provider can enter criteria for rates (take x ether at y rate and/or set rate until a timestamp)
* Provider can see the amount in ether taken for their destinations

Provider can use normal ethereum wallet to withdraw cleared funds.

http://ethertel.on.ether.camp:8080/#/


