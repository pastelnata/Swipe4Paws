import Pet from './PetModel';
import PetBehavior from './PetBehaviorModel';
import Shelter from './ShelterModel';

Pet.hasMany(PetBehavior, { as: 'behaviors', foreignKey: 'petid' });
PetBehavior.belongsTo(Pet, { as: 'pet', foreignKey: 'petid' });
Pet.belongsTo(Shelter, { foreignKey: 'shelterid' });

export { Pet, PetBehavior, Shelter };
