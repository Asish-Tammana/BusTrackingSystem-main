import SelectDropdown from "react-native-select-dropdown";
import { View } from 'react-native';


const BusesSelectList = (props) => {

    const {busesList,updateBus, activeBus} = props
    const names = busesList.map(bus => bus.bus_number);

    return(
        <View>
            <SelectDropdown data={names} 
            defaultValue={activeBus}
            onSelect={(selectedItem) => {
                updateBus(selectedItem)
            }}
            
            
            />
        </View>
    )
}
export default BusesSelectList