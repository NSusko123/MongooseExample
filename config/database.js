//Password is GdCMKHsUdC7uPyHQ

if(process.env.NODE_ENV === "production")
{
    module.exports = {mongoURI:"mongodb+srv://NSusko:GdCMKHsUdC7uPyHQ@cluster0.oxmjzyu.mongodb.net/?retryWrites=true&w=majority"}
}
else
{
    module.exports = {mongoURI:"mongodb://localhost:27017/gameEntries"}
}