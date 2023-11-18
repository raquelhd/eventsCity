import React, { useState, useEffect } from 'react'
import { Modal, Text,  SafeAreaView, StyleSheet, TextInput, View, ScrollView, Pressable, Alert } from 'react-native'
import DatePicker from 'react-native-date-picker'

const Formulario = ({
    modalVisible, 
    cerrarModal,
    eventsCity,
    setEventsCity,
    eventCity: eventCityObj,
    setEventCity: setEventCityApp
}) => {
    
    const [id, setId] = useState('')
    const [eventName, setEventName] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fecha, setFecha] = useState(new Date())
    const [descripcion, setDescripcion] = useState('')

    useEffect(() => {
        if(Object.keys(eventCityObj).length > 0 ) {
            setId(eventCityObj.id)
            setEventName(eventCityObj.eventName)
            setPropietario(eventCityObj.propietario)
            setEmail(eventCityObj.email)
            setTelefono(eventCityObj.telefono)
            setFecha(eventCityObj.fecha)
            setDescripcion(eventCityObj.descripcion)
        }
    }, [eventCityObj])


    const handleEventCity = () => {
        // Validar
        if([eventName, propietario, email, fecha, descripcion].includes('') ) {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios'
            )
            return
        }

        // Revisar si es un registro nuevo o edición
        const newEventCity = {
            eventName,
            propietario, 
            email,
            telefono, 
            fecha, 
            descripcion: descripcion
        }

        if(id) {
            // Editando
            newEventCity.id = id

            const eventsCityActualizados = eventsCity.map(eventCityState => eventCityState.id === newEventCity.id ? newEventCity : eventCityState)
            setEventsCity(eventsCityActualizados)
            setEventCityApp({})

        } else {
            // Nuevo Registro
            newEventCity.id = Date.now()
            setEventsCity([...eventsCity, newEventCity])
        }
        cerrarModal()
        setId('')
        setEventName('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setFecha(new Date())
        setDescripcion('')

    }


    return (
     <Modal
        animationType='slide'
        visible={modalVisible}
      >
        <SafeAreaView style={styles.contenido}>
            <ScrollView>
                <Text
                    style={styles.titulo}
                >{eventCityObj.id ? 'Editar' : 'Nuevo'} {''}
                    <Text style={styles.tituloBold}>Evento</Text>
                </Text>

                <Pressable 
                    style={styles.btnCancelar}
                    onLongPress={() => {
                        cerrarModal()
                        setEventCityApp({})
                        setId('')
                        setEventName('')
                        setPropietario('')
                        setEmail('')
                        setTelefono('')
                        setFecha(new Date())
                        setDescripcion('')
                    }}
                >
                    <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
                </Pressable>


                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre del evento</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Nombre EventCity'
                        placeholderTextColor={'#666'}
                        value={eventName}
                        onChangeText={setEventName}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre Propietario</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Nombre Propietario'
                        placeholderTextColor={'#666'}
                        value={propietario}
                        onChangeText={setPropietario}
                    />
                </View>


                <View style={styles.campo}>
                    <Text style={styles.label}>Email Propietario</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Email Propietario'
                        placeholderTextColor={'#666'}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Teléfono Propietario</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Teléfono Propietario'
                        placeholderTextColor={'#666'}
                        keyboardType='number-pad'
                        value={telefono}
                        onChangeText={setTelefono}
                        maxLength={10}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha Alta</Text>
                    
                    <View style={styles.fechaContenedor}>
                        {/*<DatePicker */}
                        {/*    date={fecha}*/}
                        {/*    locale='es'*/}
                        {/*    onDateChange={ (date) => setFecha(date)}*/}
                        {/*/>*/}
                    </View>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Descripcion</Text>
                    <TextInput 
                        style={[styles.input, styles.sintomasInput]}
                        placeholderTextColor={'#666'}
                        value={descripcion}
                        onChangeText={setDescripcion}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <Pressable 
                    style={styles.btnNewEvent}
                    onPress={handleEventCity}
                >
                    <Text style={styles.btnNewEventTexto}>{eventCityObj.id ? 'Editar' : 'Agregar'} Evento</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
      </Modal>
    )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#739072',
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    tituloBold: {
        fontWeight: '900'
    },
    btnCancelar: {
        marginVertical: 30,
        backgroundColor: '#ECE3CE',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    label: {
        color: '#FFF',  
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10
    },
    sintomasInput: {
        height: 100
    },
    fechaContenedor: {
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    btnNewEvent: {
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNewEventTexto: {
        color: '#5827A4',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    }
})

export default Formulario
