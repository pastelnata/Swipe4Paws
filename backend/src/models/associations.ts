import Pet from './PetModel';
import PetBehavior from './PetBehaviorModel';
import Shelter from './ShelterModel';

// pet relations
Pet.hasMany(PetBehavior, { as: 'behaviors', foreignKey: 'petid' });
PetBehavior.belongsTo(Pet, { as: 'pet', foreignKey: 'petid' });

// pet & shelter relations
Pet.belongsTo(Shelter, { foreignKey: 'shelterid' });
Shelter.hasMany(Pet, { foreignKey: 'shelterid' });


export { Pet, PetBehavior, Shelter };