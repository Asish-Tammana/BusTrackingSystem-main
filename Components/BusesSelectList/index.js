import SelectDropdown from "react-native-select-dropdown";
import { View } from 'react-native';


const BusesSelectList = (props) => {

    const {busesList,updateBus, activeBus, updateBusSearchInput} = props
    const names = busesList.map(bus => bus.bus_number);
    const uniqueNames = [... new Set(names)]

    return(
        <View>
            <SelectDropdown data={uniqueNames} 
            defaultValue={activeBus}
            defaultButtonText= {activeBus}
            search='true'
            onSelect={(selectedItem) => {
                updateBus(selectedItem)
            }}

            onChangeSearchInputText={(input) => {
                updateBusSearchInput(input)
            }}
            
            
            />
        </View>
    )
}
export default BusesSelectList