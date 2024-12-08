import { makeAutoObservable } from 'mobx'
import { injectable } from 'inversify';
import { increment, decrement } from 'test';

@injectable()
export class TestStore {

  constructor() {
    makeAutoObservable(this);
  }

  message(){
    console.log('Test store message');
    const i = increment(56,3)
    const d = decrement(56,3)
    console.log(i,d)
  }
}