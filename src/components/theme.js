import { withTheme } from 'react-native-paper';
const Test = ({ theme,children }) => {
  const { colors } = theme;
  return (
    <View style={{ backgroundColor: colors.background }}>
     {children}
    </View>
  );
};

export default withTheme(Test);