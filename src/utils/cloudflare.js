const axios = require('axios');

async function createSubdomain(host, ip, zone, apitoken, tld) {
  try {
    const cleanHost = host.replace(/[^a-z0-9.-]/gi, '').toLowerCase();
    const cleanIP = ip.replace(/[^0-9.]/g, '');
    const name = `${cleanHost}.${tld}`;
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
      {
        type: "A",
        name,
        content: cleanIP,
        ttl: 3600,
        priority: 10,
        proxied: false
      },
      {
        headers: {
          Authorization: `Bearer ${apitoken}`,
          "Content-Type": "application/json"
        }
      }
    );
    const resData = response.data;
    if (resData.success) {
      return { success: true, id: resData.result.id, zone: resData.result.zone_name, name: resData.result.name, ip: resData.result.content };
    }
    return { success: false, error: 'Unknown error from Cloudflare' };
  } catch (e) {
    const err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
    return { success: false, error: String(err1) };
  }
}

async function deleteSubdomain(recordId, zone, apitoken) {
  try {
    const response = await axios.delete(
      `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records/${recordId}`,
      {
        headers: {
          Authorization: `Bearer ${apitoken}`,
          "Content-Type": "application/json"
        }
      }
    );
    const resData = response.data;
    if (resData.success) {
      return { success: true };
    }
    return { success: false, error: 'Unknown error from Cloudflare' };
  } catch (e) {
    const err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
    return { success: false, error: String(err1) };
  }
}

module.exports = {
  createSubdomain,
  deleteSubdomain
};
