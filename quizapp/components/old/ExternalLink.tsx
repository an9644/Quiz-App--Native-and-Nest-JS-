import { useNavigation } from '@react-navigation/native'; 
import { openBrowserAsync } from 'expo-web-browser';
import { TouchableOpacity, Text, Platform } from 'react-native';

export function ExternalLink({ href }: { href: string }) {
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity
      onPress={async () => {
        console.log('Opening link:', href);
        if (!href) return;
        
        if (Platform.OS !== 'web') {
          await openBrowserAsync(href); 
        } else {
          navigation.navigate(href as never); 
        }
      }}
    >
      <Text style={{ color: 'blue' }}>Open Link</Text>
    </TouchableOpacity>
  );
}
