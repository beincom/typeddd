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

    user.toObject();

    expect(userClone.get('nickname')).not.toEqual(user.get('nickname'));
  });
});
