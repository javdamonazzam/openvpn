import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';  // برای کار با فایل

@Injectable()
export class MainService {
  async activateUser(publicKey: string): Promise<string> {
    const wg0ConfigPath = `/etc/openvpn/ccd/${publicKey}`;  // مسیر فایل کانفیگ WireGuard
  
    try {
      await fs.promises.writeFile(wg0ConfigPath, '', 'utf-8');
      return `User ${publicKey} activated.`;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to ctivate user ${publicKey}: ${error}`);
    }
  }
  async deactivateUser(publicKey: string): Promise<string> {
    const wg0ConfigPath = `/etc/openvpn/ccd/${publicKey}`;
  
    try {
      await fs.promises.writeFile(wg0ConfigPath, 'disable', 'utf-8');
      return `User ${publicKey} has been deactivated.`;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to deactivate user ${publicKey}: ${error}`);
    }
  }
}