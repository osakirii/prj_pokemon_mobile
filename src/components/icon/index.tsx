import React from "react";
import { View, ViewStyle, Image } from "react-native";
import { SvgProps } from "react-native-svg";

interface IconProps {
    name: React.FC<SvgProps> | any;
    size?: number;
    color?: string;
    style?: ViewStyle;
}

export function Icon({ name: IconComponents, size = 40, color, style }: IconProps) {
    // Check if it's a React component
    if (typeof IconComponents === 'function') {
        return (
            <View style={[{ alignItems: "center", justifyContent: "center" }, style ]}>
                <IconComponents 
                    width={size} 
                    height={size} 
                    fill={color} 
                />
            </View>
        );
    }
    
    if (typeof IconComponents === 'object' && IconComponents.uri) {
        return (
            <View style={[{ alignItems: "center", justifyContent: "center" }, style ]}>
                <Image 
                    source={IconComponents} 
                    style={{ width: size, height: size }}
                    tintColor={color}
                />
            </View>
        );
    }
    
    return null;
}