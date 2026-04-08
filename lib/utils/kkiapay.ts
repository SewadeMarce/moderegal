// lib/kkiapay.ts
import 'server-only'
import { kkiapay } from "@kkiapay-org/nodejs-sdk";
export const kkiapayClient = kkiapay({
  privatekey: process.env.KKIAPAY_PRIVATE_KEY!,
  publickey:  process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY!,
  secretkey:  process.env.KKIAPAY_SECRET_KEY!,
  sandbox:    true,
});