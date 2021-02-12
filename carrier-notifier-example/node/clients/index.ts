import { IOClients } from '@vtex/api'
import GoogleClient from './google'

export class Clients extends IOClients {
  public get google() {
    return this.getOrSet('google', GoogleClient)
  }
}
