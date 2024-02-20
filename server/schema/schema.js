const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

//dummy data
var books = [
    {name:'Book-1',genre:'Fantasy',id:'1'},
    {name:'Book-2',genre:'Fantasy',id:'2'},
    {name:'Book-3',genre:'Sci-Fi',id:'3'},
]
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:()=>({
        book:{
            type:BookType,
            args:{
                id: {type:GraphQLString}
            },
            resolve(parent,args){
                // code to get data from db / other sources
                return _.find(books,{id:args.id});
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query:RootQuery
});