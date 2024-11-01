const fs = require('fs');
const credentialsFile = '/home/saya/Botwa/plugins/Store/respon/credentials_ksr.json';

// ID grup dari link undangan
const groupID = '120363321044656638@g.us';

// Fungsi untuk memperbarui email dan password
function updateCredentials(email, password) {
   const credentials = {
      email: email,
      password: password
   };
   fs.writeFileSync(credentialsFile, JSON.stringify(credentials, null, 2));
}

exports.run = {
   usage: ['n13', 'setemail', 'pwksrcloud'],
   hidden: ['n13'],
   category: 'app',
   async: async (m, { client, text, command }) => {
      // Load email dan password dari file JSON
      const credentials = JSON.parse(fs.readFileSync(credentialsFile, 'utf8'));

      // Jika perintah adalah setemail, ubah email
      if (command === 'setemail') {
         if (!text) return client.reply(m.chat, 'Masukkan email baru', m);
         credentials.email = text.trim();
         updateCredentials(credentials.email, credentials.password);
         return client.reply(m.chat, `Email berhasil diubah ke: ${credentials.email}`, m);
      }

      // Jika perintah adalah setpassword, ubah password
      if (command === 'pwksrcloud') {
         if (!text) return client.reply(m.chat, 'Masukkan password baru', m);
         credentials.password = text.trim();
         updateCredentials(credentials.email, credentials.password);
         return client.reply(m.chat, `Password berhasil diubah ke: ${credentials.password}`, m);
      }

      // Untuk perintah n6, kirim pesan dengan email dan password dari file JSON
      try {
         const currentDate = new Date();
         const formattedDate = currentDate.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
         });
         const endDate = new Date(currentDate);
         endDate.setDate(endDate.getDate() + 30);
         const formattedEndDate = endDate.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
         });

         const transactionID = Math.random().toString(36).substring(2, 10).toUpperCase();
         const nomorPengirim = m.sender.split('@')[0];

         const message = {
            image: { url: 'https://i.ibb.co.com/Fk1BByq/PESANAN.png' },
            caption: `*PESANAN SELESAI*
━━━━━━━━━━━━━━━━━━
*Email*: ksrcloud2@gmail.com
*Password*: ${credentials.password}
*Profile*: _4_
*Pin*: _6655_
━━━━━━━━━━━━━━━━━━
*Pembeli* : _${nomorPengirim}_
*Tanggal*: _${formattedDate}_
*Berakhir*: _${formattedEndDate}_ 
*ID Transaksi*: _${transactionID}_
━━━━━━━━━━━━━━━━━━
📝 Catatan:
* Jika terjadi *Household* silahkan baca disini : 
_https://whatsapp.com/channel/0029VanfLzJ8vd1H9fAFQS0t/101_
* Rules silahkan baca disini :
_https://whatsapp.com/channel/0029VanfLzJ8vd1H9fAFQS0t/110_
━━━━━━━━━━━━━━━━━━
*Terima kasih!*`
 };
         // Forward pesan ke grup
         await client.sendMessage(groupID, message);
         
         await client.sendMessage(m.chat, message);
      } catch (e) {
         console.error(e);
         client.reply(m.chat, 'Terjadi kesalahan saat mengirim akun.', m);
      }
   },
   error: false,
   cache: true,
   location: __filename
};
