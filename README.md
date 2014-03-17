Hypermedia in the Wizard's Tower is a simple text-based adventure game starring hypermedia using the Siren format.

To install dependencies type 

```javascript
npm install
```

Start the program with

```javascript
node start.js
> game.void()
```

Help?

```javascript
> game.help()
```

Where you are?

```javascript
> game.at()
```

What it looks like there?

```javascript
> game.all()
```

Things to do that might alter the state of the world?

```javascript
> game.actions()
```

To do action 'pontificate', with some parameters:

```javascript
> game.do('pontificate', { topic: 'the arts', duration: '3 hours' })
```

Available hyperlinks aka places to go?

```javascript
> game.links()
```

To navigate to the third available link:

```javascript
> game.go(2)
```

To follow a link header if one was provided:

```javascript
> game.follow()
```
