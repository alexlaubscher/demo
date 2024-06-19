# Server

## Setup

### Client
Install NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash`.

```sh
cd client/
nvm install 16.16.0
node --version
npm --version
npm install --global yarn
yarn --version
```

### Server

Install packages with `pip` or `pip3`:

```sh
pip3 install python-dotenv fastapi sqlalchemy fastapi uvicorn
```

## Usage

### Client
```sh
cd client

# Only needed if you haven't done this in a while or you get an error.
yarn install

yarn dev
```

If successful:

```sh
yarn run v1.22.19
$ next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry

event - compiled client and server successfully in 2.5s (170 modules)
wait  - compiling...
event - compiled successfully in 119 ms (137 modules)
```

Open [http://localhost:3000](http://localhost:3000).

### Server

```sh
# Option 1 (might work)
uvicorn main:app --reload

# Option 2
python3 -m uvicorn main:app --reload
```
