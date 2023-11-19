import React, { useState } from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Alert
} from 'react-native'
import Formulario from './src/components/Formulario'
import EventCity from './src/components/eventCity';
import InformationEventCity from './src/components/InformationEventCity';

const App = () => {

  const [modalVisible, setModalVisible] = useState(false)
  const [eventsCity, setEventsCity] = useState([])
  const [eventCity, setEventCity] = useState({})
  const [modalEventCity, setModalEventCity] = useState(false)

  const eventCityEdit = id => {
    const eventCityEdit = eventsCity.filter(eventCity => eventCity.id === id )
    setEventCity(eventCityEdit[0])
  }

  const eventCityDelete = id => {
    Alert.alert(
        '¿Deseas eliminar este evento?',
        'Un evento eliminado no se puede recuperar',
        [
          { text: 'Cancelar' },
          { text: 'Si, Eliminar', onPress: () => {
              const eventCityUpdated = eventsCity.filter( eventCityState => eventCityState.id !== id )
              setEventsCity(eventCityUpdated)
            }}
        ]
    )
  }

  const cerrarModal = () => {
    setModalVisible(false)
  }

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Administrador de eventos {''}
          <Text style={styles.tituloBold}>En la ciudad</Text>
        </Text>

        <Pressable
            style={styles.btnNewEvent}
            onPress={() => setModalVisible(!modalVisible)}
        >
          <Text
              style={styles.btnTextoNewEvent}
          >Nuevo evento</Text>
        </Pressable>

        {eventsCity.length === 0 ?
            <Text style={styles.noEvents}>No hay eventos aún</Text> :
            <FlatList
                style={styles.listado}
                data={eventsCity}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                  return(
                      <EventCity
                          item={item}
                          setModalVisible={setModalVisible}
                          setEventCity={eventsCity}
                          eventCityEdit={eventCityEdit}
                          eventCityDelete={eventCityDelete}
                          setModalEventCity={setModalEventCity}
                      />
                  )
                }}
            />
        }


        {modalVisible && (
            <Formulario
                cerrarModal={cerrarModal}
                eventsCity={eventsCity}
                setEventsCity={setEventsCity}
                eventCity={eventCity}
                setEventCity={setEventCity}
            />
        )}

        <Modal
            visible={modalEventCity}
            animationType='slide'
        >
          <InformationEventCity
              eventCity={eventCity}
              setEventCity={setEventCity}
              setModalEventCity={setModalEventCity}
          />
        </Modal>

      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#739072',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#739072',
  },
  btnNewEvent: {
    backgroundColor: '#3A4D39',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNewEvent: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noEvents: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
})

export default App;