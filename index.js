const url = require('url')
const crypto = require('crypto')
const base58 = require('bs58')

module.exports = (tokenStore, emailClient) => {
  if (!tokenStore) {
    throw new Error('Token store is missing')
  }

  if (!emailClient) {
    throw new Error('Email Client is missing')
  }

  const max = 4294967296

  return {
    // Generating token
    // 1. POST /send-token BODY [email: 'blah@blah.com'].
    // 2. Generate temporary token against email with TTL.
    // 3. Send email with token
    sendEmail (email) {
      return new Promise((resolve, reject) => {
        const buffer = crypto.randomBytes(4);
        const token = Math.floor(buffer.readUInt32BE(0) % max).toString();
        emailClient(email, 'Subject: verify email', `<a href="${baseUrl}/verify/${token}">Verify your email</a>`)
          .then(() => resolve())
          .catch(err => reject(err))
      })
    },
    // User verifying
    // 1. Clicks on email
    // 2. Reedem token
    // 3. Issue JWT and commit to session store
    verify (token) {

    }
  }
}
