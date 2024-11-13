// components/ErrorAlert.js
import { Alert } from 'react-native';

export default function ErrorAlert(message) {
  Alert.alert('Error', message);
}
