import mysql from "mysql2" 

import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()   // Since we used promise we gonne use async await version rather than old callback version.

//In callback version we use .then after each query but in promise we need async function and store them in a variable.


export async function getNotes (){
    // const result = await pool.query("SELECT * FROM notes")
    const [rows] = await pool.query("SELECT * FROM notes")//The same above we used destructoring. will get 1st list.
    return rows;
}


export async function getNote(id){
    const [rows] = await pool.query(`
    SELECT *
    FROM notes
    WHERE id=?
    `, [id])  //here passsing ? is the correct way.
    return rows[0];
}


export async function createNote(title, contents){
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    values (?, ?)
    `, [title, contents])
    
    const id = result.insertId
    return getNote(id);
}


export async function deleteNote(id){
    const [result] = await pool.query(`
    DELETE
    FROM notes
    WHERE id=?
     `,[id])
    return result
}
