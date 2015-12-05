# EtherTel

## Why?

In the advent of SIP and VOIP the cost of communication has fallen significantly. Users are able to find cheap and often free means with which to communicate. 

These could be VoIP networks such as Skype where users “on net” can look one another up and initiate a VoIP call or video chat. 

Additionally providers offer least cost routing services, such as, calling card solutions. Providers leverage cheaper connections internationally and then break out calls to the local PSTN thus enabling users to only pay the costs of the local legs. 

The convergence of these markets have lead to the network led providers offering PSTN break out and similarly traditional Calling Card businesses offering free on net calling services. 

## Decentralise...

In the case of the network solution there is a single central directory upon which the parties register and only when both are online they can talk. If break out is required the price is locked to that of the network provider. 

Users ultimately will manage multiple connections to encompass their entire online network and similarly use different provider in order to achieve the best available local PSTN pricing across different countries. 

The concept of EtherTel is to explore ways in which provider can advertise their services over the block-chain and based upon the required interaction users can select their preferred choice across a transparent market. 
 
It may be that users can leverage the solution to create WebRTC based calls directly between one another without the need for a central party at all. Firewalls NAT issues will limit the effectiveness of this and as such users can connect through a provider offering ICE and TURN services on the block chain. Other users may wish to dial internationally and in a model similar to the old phone box they can contact (with a contract) a provider to fulfill their requirement. 

## Proof-of-Concept

For the purpose of a PoC we have explored this option.  Providers offering PSTN break out can publish rate cards on the blockchain. A user can then navigate to a page and request a call to a given destination. The response will be a list of available providers with prices of available rates for the required call. Upon selection the user will imitate a call based upon the published connection mechanisms of the provider and the call is placed. Tied into the contract are the contract details. 

We hope this gives some food for thought and should you be a VoIP provider and wish to try this service please do contact us and we will be happy to discuss how you can connect to the blockchain and extend the reach of EtherTel. 

# Smart Contracts

[RateEx](https://github.com/andygray/ethertel/blob/master/dapp/contracts/RateEx.sol) Contract

 * holds all addresses of Provider's [RateCard](https://github.com/andygray/ethertel/blob/master/dapp/contracts/RateCard.sol)
 * contains all calls attempted and completed
 * handles the assignment of ether to the various parties including refunds, escrow, and Provider payment
 * calculates lowest rates for destinations

[RateCard](https://github.com/andygray/ethertel/blob/master/dapp/contracts/RateCard.sol) Contract
  * has the rates offered for desinations
  * owner of the rates

# Requirements 

Simple payphone web based client: 

* A user can enter their seed password in the client to sign into their Ethereum account. This will need a balance > 0 to make telephone calls (to landlines/mobiles)
* User only pays for the call, they enter a (international/local) telephone number and estimated minutes and will receive an quote in ether (based on the best rate on the exchange). They can then place the call and send the required ether. Once the call completes the client will be informed of the cost and refunded any unused ether.
* User can see previous transactions made. Call Number/Call Duration/Call Cost/Call Rate

User can use normal ethereum wallet to fund account and calls.

## Rate Exchange

* Show the current best rates to destinations
* Show historic rates and price flucations TODO
* Call cost estimator TODO
* Show pricing for destinations per RateCard of provider

## Provider Back-office

* Provider can enter their seed password in the client to sign into their (Provider) Ethereum account. They can see their balance of calls that have been placed with them.
* Provider can submit/edit rate cards to destinations in ether TODO
* Provider can see the amount in ether taken for their RateCard

Provider can use normal ethereum wallet to withdraw cleared funds.


## Demo

http://ethertel.on.ether.camp:8080/#/


