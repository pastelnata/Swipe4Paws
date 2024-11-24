import Pet from './PetModel';
import PetBehavior from './PetBehaviorModel';
import Shelter from './ShelterModel';
import Moderator from './ModeratorModel';
import User from './UserModel';

// pet & pet behavior relations
Pet.hasMany(PetBehavior, { as: 'behaviors', foreignKey: 'petid' });
PetBehavior.belongsTo(Pet, { as: 'pet', foreignKey: 'petid' });

// pet & shelter relations
Pet.belongsTo(Shelter, { foreignKey: 'shelterid' });
Shelter.hasMany(Pet, { foreignKey: 'shelterid' });

// shelter & moderator relations
Moderator.hasMany(Shelter, { foreignKey: 'managed_by' });
Shelter.belongsTo(Moderator, { foreignKey: 'managed_by'});

// user & preferences relations
User.hasMany(PetBehavior, { as: 'preferences', foreignKey: 'userid' });
PetBehavior.belongsTo(User, { as: 'user', foreignKey: 'userid' });


export { Pet, PetBehavior, Shelter, Moderator, User };