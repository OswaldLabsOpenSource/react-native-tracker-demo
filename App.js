import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Agastya from "./Agastya";
const tracker = new Agastya();
tracker.init({
  apiKey: "demo",
  url: "https://react-native-tracker-demo.oswaldlabs.com"
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracking: false, lastTracked: null };
  }
  componentDidMount() {
    this.track();
  }
  track(action = "pageview", event) {
    this.setState({ tracking: true });
    tracker.track(action, event)
      .then(() => console.log("Tracked successfully"))
      .catch(() => {})
      .then(() => this.setState({ tracking: false, lastTracked: new Date() }));
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          {
            this.state.tracking ?
              <Text>Tracking...</Text>
            :
              <Text>
                Event tracked: { !!this.state.lastTracked && this.state.lastTracked.toLocaleString() }
              </Text>
          }
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Track a custom event"
            onPress={() => this.track("custom_example")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
