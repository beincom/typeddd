import { initUser } from './entity.mock';
import { Entity } from '../../../packages/domain/src/entities';

describe('Entity', () => {
  it('should to be defined', () => {
    expect(Entity).toBeDefined();
  });

  it('clone', () => {
    const user = initUser();

    const userClone = user.clone();

    expect(userClone).toEqual(user);

    userClone.set('nickname', []);

    const changedStr = userClone.getChangedProps();

    expect(changedStr[0]).toEqual('nickname');

    const changedObj = userClone.getChangedProps(true);
    expect(changedObj[0].name).toEqual('nickname');
    expect(changedObj[0].oldValue).toEqual(user.toObject()['nickname']);
    expect(changedObj[0].currentValue).toEqual([]);

    user.toObject();

    expect(userClone.get('nickname')).not.toEqual(user.get('nickname'));
  });
});
