import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import {
    BarCodeScanner,
    Permissions
} from 'expo';

export default class BookScanerScreen extends React.Component {
    state = {
        hasCameraPermission: null
    }
    fetchBookByISBN(isbn) {
        return fetch(
                `https://openapi.naver.com/v1/search/book_adv.json?d_isbn=${isbn}`, {
                    headers: {
                        "X-Naver-Client-Id": "vTiJhVKTgkFtmAOe1aRw",
                        "X-Naver-Client-Secret": "KNnOp1CgQd"
                    }
                }
            )
            .then(response => response.json())
            .then(responseJson => {
                return responseJson.items[0];
            })
            .catch(error => {
                console.error(error);
            });
    }
    async componentDidMount() {
        const {
            status
        } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    }

    render() {
        // const {hasCameraPermission} = this.state;
        return(
        < View style = {{flex: 1}}>
        {this.state.hasCameraPermission === null ?
            
            <Text> Requesting for camera permission </Text> :
        
        this.state.hasCameraPermission === false ? <Text> No access to camera </Text> :
            <BarCodeScanner onBarCodeScanned = {this.handleBarCodeScanned} style = {StyleSheet.absoluteFill}/> 
       
        }
        </View>
        )
    }
    

    handleBarCodeScanned = ({
        data
    }) => {
        this.fetchBookByISBN(data).then((items) => {
            this.props.navigation.navigate('detail', {
                itemId: items.link
            })
        });
    }
}
