import SpeedSVG from '../assets/svg/speed.svg';
import AccelerationSVG from '../assets/svg/acceleration.svg';
import ForceSVG from '../assets/svg/force.svg';
import GasolineSVG from '../assets/svg/gasoline.svg';
import EnergySVG from '../assets/svg/energy.svg';
import HybridSVG from '../assets/svg/hybrid.svg';
import ExchangeSVG from '../assets/svg/exchange.svg';
import PeopleSVG from '../assets/svg/people.svg';
import CarSVG from '../assets/svg/car.svg';

function getAccessoryIcon(type: string){
    switch( type ){
      case 'speed':
        return SpeedSVG;
      case 'acceleration':
        return AccelerationSVG;
      case 'turning_diameter':
        return ForceSVG;
      case 'gasoline_motor':
        return GasolineSVG;
      case 'electric_motor':
        return EnergySVG;
      case 'hybrid_motor':
        return HybridSVG;
      case 'exchange':
        return ExchangeSVG;
      case 'seats':
          return PeopleSVG;
      default:
        return CarSVG;
    };
};

/**
 * EXPORTS
 */
export {
  getAccessoryIcon
}