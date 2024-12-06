package com.codechimp.model;

public class User {
    private int id;
    private String name;
    private int age;

    // Default constructor
    public User() {}

    // Parameterized constructor
    public User(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    // Getter and setter for id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter and setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and setter for age
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
