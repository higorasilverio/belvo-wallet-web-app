import axios from 'axios'

export class AppService {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://belvo-wallet-challenge-api.herokuapp.com/',
      headers: { Authorization: localStorage.getItem('token') }
    })
  }

  async authenticate(password, username) {
    const payload = { password, username }
    const { data } = await this.instance.post('login', payload)

    return data
  }

  async wallet() {
    const { data } = await this.instance.get('wallet')

    return data
  }

  async contacts() {
    const { data } = await this.instance.get('contacts')

    return data
  }

  async transfer(payload) {
    const { data } = await this.instance.post('wallet/send', payload)

    return data
  }
}
