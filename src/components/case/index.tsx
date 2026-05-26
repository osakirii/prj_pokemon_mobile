//parte externa que lembra o nintendo switch

import { View } from "react-native";


type CaseProps = {
    children: React.ReactNode;
}

export default function Case({ children }: CaseProps) {
    return (
        <View className="bg-[#d73431] p-4 rounded-lg border-4 border-[#000] w">
            <h1 className="text-white text-2xl font-bold">AUU</h1>
            {children}
        </View>
    )    
}