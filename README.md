# Blockchain-Node-Logging

Logging the test blockchain node ethereum-ganache using Promtail, Loki and Grafana in a containerized setup.

This project sets up a containerized environment to monitor and visualize logs from an Ethereum test node (Ganache) using Promtail, Loki, and Grafana.

### Overview

The system comprises the following components:

- Ganache: A personal Ethereum blockchain used for testing smart contracts.

- Promtail: Collects logs from Ganache and forwards them to Loki.

- Loki: Stores and indexes logs received from Promtail.

- Grafana: Visualizes logs stored in Loki through dashboards.

This simple architecture ensures real-time log monitoring of the Ganache node, facilitating efficient debugging and analysis.

### Prerequisites

Docker and docker-compose installed on your machine.

### Setup Instructions

Clone the Repository and navigate to the root folder.

**1. Start the Services**

Use Docker Compose to build and start all services:

```
docker-compose up -d
```

This command will start and run the following services in detached mode:

- Ganache on port 8545
- Loki on port 3100
- Grafana on port 3000
- Promtail (no exposed port)

**2. Access Grafana Dashboard**

Open your browser and navigate to http://localhost:3000
```
Username: admin
Password: admin
```

Upon first login, you'll be prompted to change the password.

**3. Configure Data Source in Grafana**

- Navigate to Configuration > Data Sources.
- Click Add data source and select Loki.
- Set the URL to http://loki:3100 and click Save & Test.

**4. Import Dashboard in Grafana**

- Navigate to Create > Import.
- You can create a new dashboard or import an existing one tailored for Ganache logs.

### Testing the Setup by simulating transactions (Client)

A simple web3.js client is included in the client folder to simulate mock Ethereum transactions against the Ganache node This helps trigger log activity for testing and visualization.

**1. Install Dependencies**

Navigate to the client folder and install required packages:

```
cd client
npm install
```

**2. Run the Simulation Script**

Execute the script to send a transaction from one Ganache account to another:

```
node web3.js
```

This script does the following:

- Connects to the Ganache node at http://localhost:8545.
- Retrieves the first two accounts from Ganache.
- Sends 1 ETH from account[0] to account[1].
- Logs transaction success or failure to the console.

**3. Check Logs in Grafana**

After running the simulation, go to Grafana → Explore → run a query like:

```
{job="ganache"} |= "Transaction Success"
```

or

```
{job="ganache"} |= "Transaction Failed"
```

You can verify logs coming from your simulated transactions.

**4. Play with Grafana Dashboard and Alerts**

Once we verify the logs are being visualized to Grafana, we can configure different dashboard analytics as needed. We can also configure alerts on Grafana to notify us in case of any mallicious activities, suspicious transactions or irregular network activity.
