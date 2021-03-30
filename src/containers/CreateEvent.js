import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight,
    TouchableOpacity,
    TextInput, 
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showDate: false,
        showTime: false,
        date: new Date('2015-03-25'),
        time: new Date('2015-03-25'),
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <View style={{flex: 1, borderWidth: 1}}>
        <View style={styles.header}>
            <View 
                style={{
                    flex: 0.2, 
                    backgroundColor: 'green', 
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TouchableHighlight 
                    underlayColor="#D8D8D86B"
                    style={{
                        width: 40, 
                        height: 40,
                        borderRadius: 40/2,
                        justifyContent: 'center',
                        alignItems: 'center' 
                    }}
                    onPress={() => alert('hello world')}
                >
                    <Icon
                        style={{margin: 5}}
                        name="angle-left"
                        size={28}
                        color="#fff"
                    />
                </TouchableHighlight>
            </View>
            <View 
                style={{
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'green'
                }}
            >
                <Text style={{fontSize: 23, color: 'white'}}> Create an event </Text>
            </View>
        </View>
        <ScrollView style={{flex: 1}}>
            <View style={styles.form}>
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 10,
                        marginHorizontal: 15,
                        fontWeight: 'bold',
                        color: 'green',
                    }}
                >
                    Event name
                </Text>
                <TextInput
                    style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: 'green',
                        marginHorizontal: 15,
                        marginTop: 10,
                        height: 43,
                        padding: 7,
                        backgroundColor: '#ebebeb',
                        fontSize: 16,
                    }}
                    placeholder="Enter event name"
                    placeholderTextColor="#000"
                />
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 10,
                        marginHorizontal: 15,
                        fontWeight: 'bold',
                        color: 'green',
                    }}
                >
                    Small description about event
                </Text>
                <TextInput
                    style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: 'green',
                        marginHorizontal: 15,
                        marginTop: 10,
                        height: 43,
                        padding: 7,
                        backgroundColor: '#ebebeb',
                        fontSize: 16,
                    }}
                    placeholder="Brief description"
                    placeholderTextColor="#000"
                />
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 10,
                        marginHorizontal: 15,
                        fontWeight: 'bold',
                        color: 'green',
                    }}
                >
                    Full description(optional)
                </Text>
                <TextInput
                    style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: 'green',
                        marginHorizontal: 15,
                        marginTop: 10,
                        height: 43,
                        padding: 7,
                        backgroundColor: '#ebebeb',
                        fontSize: 16,
                    }}
                    placeholder="Full description"
                    placeholderTextColor="#000"
                />
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 10,
                        marginHorizontal: 15,
                        fontWeight: 'bold',
                        color: 'green',
                    }}
                >
                    Date of event
                </Text>
                <TouchableOpacity
                    style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: 'green',
                        backgroundColor: 'green',
                        marginTop: 5,
                        marginBottom: 10,
                        marginHorizontal: 15,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => this.setState({date: new Date('2015-03-25'), showDate: true})}
                >
                    <Text 
                        style={{
                            fontSize: 16, 
                            color: '#fff'
                        }}
                    >
                        {JSON.stringify(this.state.date) === JSON.stringify(new Date('2015-03-25')) ? 'Select Date' : this.state.date}
                    </Text>
                </TouchableOpacity>
                {this.state.showDate ? 
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode='date'
                        display="default"
                        onChange={(x, date) => {
                            var d = new Date(date);
                            var dt = date.getDate();
                            var mt = date.getMonth();
                            var yr = date.getFullYear();
                            var fd = dt + '-' + mt + '-' + yr;
                            this.setState({showDate: false, date: fd});
                        }}
                    />
                : null}
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 10,
                        marginHorizontal: 15,
                        fontWeight: 'bold',
                        color: 'green',
                    }}
                >
                    Time of event
                </Text>
                <TouchableOpacity
                    style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: 'green',
                        backgroundColor: 'green',
                        marginTop: 5,
                        marginBottom: 10,
                        marginHorizontal: 15,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => this.setState({time: new Date('2015-03-25'), showTime: true})}
                >
                    <Text 
                        style={{
                            fontSize: 16, 
                            color: '#fff'
                        }}
                    >
                        {JSON.stringify(this.state.time) === JSON.stringify(new Date('2015-03-25')) ? 'Select time' : this.state.time}
                    </Text>
                </TouchableOpacity>
                {this.state.showTime ? 
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.time}
                        mode='time'
                        display="spinner"
                        is24Hour={true}
                        onChange={(x, time) => {
                            if(time !== undefined) {
                                var hours = new Date(time).getHours();
                                var mins = new Date(time).getMinutes();
                                mins = mins < 10 ? '0'+mins : mins;
                                var ampm = hours >= 12 ? 'PM' : 'AM';
                                hours = hours<10 ? '0' + hours : hours 
                                var t = hours + ':' + mins + ' ' + ampm;
                                this.setState({showTime: false, time: t});
                            }
                        }}
                    />
                : null}
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 10,
                        marginHorizontal: 15,
                        fontWeight: 'bold',
                        color: 'green',
                    }}
                >
                    Venue
                </Text>
                <TextInput
                    style={{
                        borderBottomWidth: 1.5,
                        borderBottomColor: 'green',
                        marginHorizontal: 15,
                        marginTop: 10,
                        height: 43,
                        padding: 7,
                        backgroundColor: '#ebebeb',
                        fontSize: 16,
                    }}
                    placeholder="Enter venue"
                    placeholderTextColor="#000"
                />
                <TouchableOpacity
                    style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: 'green',
                        backgroundColor: 'green',
                        marginTop: 5,
                        marginBottom: 10,
                        marginHorizontal: 15,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{fontSize: 16, color: '#fff'}}>Create</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        flex: 0.1,
        flexDirection: 'row',
    },
    form: {
        flex: 1,
    }
});
