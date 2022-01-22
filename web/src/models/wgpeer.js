export default function wgpeer(name, ip, allowed_range, pubkey, privkey, date) {
    this.client_name = name
    this.ip_address = ip
    this.date_added = date || Date.now()
    this.allowed_ip_range = allowed_range
    this.client_public_key = pubkey
    this.client_private_key = privkey
}
