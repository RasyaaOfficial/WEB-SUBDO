const users = [
  {
    email: 'admin@contoh.com',
    password: 'admin123',
    nama: 'Admin Rasyaa',
    role: 'admin'
  },
  {
    email: 'reseller@contoh.com',
    password: 'reseller123',
    nama: 'Reseller Rasyaa',
    role: 'reseller'
  },
  {
    email: 'user1@contoh.com',
    password: 'user123',
    nama: 'User Satu',
    role: 'user'
  },
  {
    email: 'user2@contoh.com',
    password: 'user234',
    nama: 'User Dua',
    role: 'user'
  }
];

const subdomains = [
  {
    userEmail: 'user1@contoh.com',
    hostname: 'tes',
    ip: '192.168.1.1',
    tld: 'hosting-privateku.web.id',
    subdomain: 'tes.hosting-privateku.web.id',
    nodeSubdomain: 'node.tes.hosting-privateku.web.id',
    createdAt: new Date()
  },
  {
    userEmail: 'user1@contoh.com',
    hostname: 'tes2',
    ip: '192.168.1.2',
    tld: 'hosting-privateku.web.id',
    subdomain: 'tes2.hosting-privateku.web.id',
    nodeSubdomain: 'node.tes2.hosting-privateku.web.id',
    createdAt: new Date()
  },
  {
    userEmail: 'user2@contoh.com',
    hostname: 'tes3',
    ip: '192.168.1.3',
    tld: 'hosting-privateku.web.id',
    subdomain: 'tes3.hosting-privateku.web.id',
    nodeSubdomain: 'node.tes3.hosting-privateku.web.id',
    createdAt: new Date()
  },
  {
    userEmail: 'reseller@contoh.com',
    hostname: 'resellerhost',
    ip: '192.168.1.4',
    tld: 'hosting-panelku.biz.id',
    subdomain: 'resellerhost.hosting-panelku.biz.id',
    nodeSubdomain: 'node.resellerhost.hosting-panelku.biz.id',
    createdAt: new Date()
  },
  {
    userEmail: 'admin@contoh.com',
    hostname: 'adminhost',
    ip: '192.168.1.5',
    tld: 'hostingku-private.web.id',
    subdomain: 'adminhost.hostingku-private.web.id',
    nodeSubdomain: 'node.adminhost.hostingku-private.web.id',
    createdAt: new Date()
  }
];

module.exports = { users, subdomains };
