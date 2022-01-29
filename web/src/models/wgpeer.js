export default function wgpeer(name, ip, allowed_range) {
    this.client_name = name
    this.ip_address = ip
    this.allowed_ip_range = allowed_range || '0.0.0.0/0'
}
