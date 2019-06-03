var sendmail = require('sendmail')({silent: true});

sendmail({
  from: 'alexey.sachevichik@succraft.com',
  to: 'roim@ya.ru',
  // from: 'roim@ya.ru',
  // to: 'alexey.sachevichik@succraft.com',
  subject: 'Send message subject',
  html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quaerat quisquam nulla hic placeat suscipit quam omnis, natus pariatur veritatis, in ut iusto minus, similique voluptate expedita at architecto magni nam facere itaque. Ipsam sapiente quia sint dolorem quos quibusdam ratione, cum dolore maxime repellendus voluptatem tempora ducimus et delectus laborum excepturi fugiat, consequuntur sequi. Temporibus cumque consectetur quaerat, soluta eaque dolore, eum consequuntur labore accusantium veritatis in quasi modi iusto voluptatibus similique voluptates dolorem saepe nisi perferendis natus vero eveniet porro! Explicabo repellendus, quasi deserunt nostrum accusamus neque earum iusto reiciendis impedit. Animi ab, fugiat? Ullam, beatae praesentium ut.</p>'
}, function (err, reply) {
  console.log(err && err.stack)
  console.dir(reply)
})