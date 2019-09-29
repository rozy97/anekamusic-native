
// import React from 'react';
// import {ScrollView, View, Text} from 'react-native';

// import ItemCard from '../Components/ItemCard';
// import { connect } from 'react-redux';


// class Cart extends React.Component{

//   render(){

//     return (
//       <React.Fragment>
//       {/* <SearchBar/> */}
//       <ScrollView style={{flex:1, }}>
//         <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
       
//           {this.props.cart.length? 
//           <React.Fragment>
//             {this.props.cart.map((item,index) => {
//               return(
//                 <ItemCard item={item} isCart='true' key={index}/>
//               )
//             })}
//           </React.Fragment>
//           :   
//           <Text>No item(s) in your cart</Text>
//           }
//         </View>
//       </ScrollView>
//       </React.Fragment>
//     );
//   }
// };



// function mapStateToProps(state){
//   return{
//       cart: state.cart.cart
//   }
// }

// export default connect(mapStateToProps)(Cart);