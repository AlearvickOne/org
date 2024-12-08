import container from '../../../ioc/ioc';
import { TestStore } from './store/test-store';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

const testStore = container.get<TestStore>("TestStore");

export const TestPage = observer(() => {
  useEffect(() => {
    testStore.message()
  }, [])


  return <div>Тест</div>
})