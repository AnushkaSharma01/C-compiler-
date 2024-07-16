using System;

class Program
{
    public static void Main(string[] args)
    {
        // Read the user input directly from command-line arguments
        string userInput = args.Length > 0 ? args[0] : string.Empty;

        // Display a prompt and read the name
        Console.WriteLine("Enter your name:");
        string name = string.IsNullOrEmpty(userInput) ? Console.ReadLine() : userInput;

        // Greet the user
        Console.WriteLine($"Hello, {name}!");
    }
}
