

## 🪜 STEP-BY-STEP ROADMAP

### Step 1 — Unzip the folder
Right-click the zip file → "Extract All" (Windows) or double-click (Mac).
You'll get a folder called `razorpay-backend`.

### Step 2 — Install Node.js (if you don't have it)
Go to https://nodejs.org → download the **LTS version** → install it like any normal app (keep clicking Next).

### Step 3 — Open the folder in a terminal
- Open **VS Code** (a free code editor, download from https://code.visualstudio.com if needed)
- Click **File → Open Folder** → select `razorpay-backend`
- Open the terminal inside VS Code: menu **Terminal → New Terminal**

### Step 4 — Install the ingredients (packages)
In the terminal, type this and press Enter:
```
npm install
```
This downloads all the tools your kitchen needs. Wait till it finishes.

### Step 5 — Get your free Razorpay Test Keys
1. Go to https://dashboard.razorpay.com/signup and create a free account
2. Once logged in, make sure you're in **Test Mode** (toggle at top)
3. Go to **Settings → API Keys → Generate Test Key**
4. You'll get two things: a **Key ID** and a **Key Secret** — copy both

### Step 6 — Add your keys to the project
1. Find the file called `.env.example` in your folder
2. Make a **copy** of it and rename the copy to exactly: `.env`
3. Open `.env` and paste your keys like this:
```
RAZORPAY_KEY_ID=paste_your_key_id_here
RAZORPAY_KEY_SECRET=paste_your_key_secret_here
PORT=5000
```
4. Save the file.

⚠️ Never share your `.env` file or upload it to GitHub — it's your secret password!

### Step 7 — Start your kitchen (run the server)
In the terminal, type:
```
npm start
```
If you see this message, you did it right:
```
🚀 Server running on http://localhost:5000
```

### Step 8 — Test that it actually works
1. Open the folder `test-page` inside your project
2. Double-click `index.html` — it opens in your browser
3. Fill in name, email, amount → click **Pay Now**
4. Use this FAKE test card to "pay" (it's not real money, just testing):
   - Card Number: `4111 1111 1111 1111`
   - Expiry: any future date (e.g. `12/30`)
   - CVV: any 3 digits (e.g. `123`)
   - OTP: `1234` (if it asks)
5. If it says **"✅ Payment Successful!"** — your backend works perfectly! 🎉

---

## 📂 What each file does

| File | What it's for |
|---|---|
| `server.js` | The main switch that turns your kitchen ON |
| `routes/payment.js` | The signboard that says "orders go this way, verification goes that way" |
| `controllers/paymentController.js` | The actual chef — creates orders & checks if payment is real |
| `.env` | Your secret keys (you create this yourself, never share it) |
| `test-page/index.html` | A rough test menu just for YOU to check things work |

---

## 🧠 Quick Recap (in case someone asks what you did)
- I built a **Node.js + Express server**
- It has **2 APIs**:
  - `/api/payment/create-order` → creates a Razorpay test order
  - `/api/payment/verify` → checks if the payment was genuine
- I tested it using a fake test card and it worked

