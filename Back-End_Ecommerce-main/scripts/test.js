#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testTypes = {
    unit: 'Unit Tests',
    integration: 'Integration Tests',
    all: 'All Tests'
};

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            stdio: 'inherit',
            shell: true,
            ...options
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve(code);
            } else {
                reject(new Error(`Command failed with exit code ${code}`));
            }
        });

        child.on('error', (error) => {
            reject(error);
        });
    });
}

async function runTests(testType = 'all') {
    const startTime = Date.now();

    log(`\n${colors.cyan}${colors.bright}🧪 Running ${testTypes[testType]}${colors.reset}\n`);

    try {
        let testPattern;
        let testName;

        switch (testType) {
            case 'unit':
                testPattern = 'src/__tests__/*.test.js';
                testName = 'Unit Tests';
                break;
            case 'integration':
                testPattern = 'src/__tests__/integration/*.test.js';
                testName = 'Integration Tests';
                break;
            case 'all':
            default:
                testPattern = 'src/__tests__/**/*.test.js';
                testName = 'All Tests';
                break;
        }

        log(`${colors.blue}📋 Test Pattern: ${testPattern}${colors.reset}`);
        log(`${colors.blue}📁 Working Directory: ${process.cwd()}${colors.reset}\n`);

        await runCommand('npm', ['test', '--', '--testPathPattern', testPattern]);

        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        log(`\n${colors.green}${colors.bright}✅ ${testName} completed successfully!${colors.reset}`);
        log(`${colors.green}⏱️  Duration: ${duration}s${colors.reset}\n`);

    } catch (error) {
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        log(`\n${colors.red}${colors.bright}❌ ${testTypes[testType]} failed!${colors.reset}`);
        log(`${colors.red}⏱️  Duration: ${duration}s${colors.reset}`);
        log(`${colors.red}💥 Error: ${error.message}${colors.reset}\n`);

        process.exit(1);
    }
}

async function runCoverage() {
    log(`\n${colors.cyan}${colors.bright}📊 Running Test Coverage${colors.reset}\n`);

    try {
        await runCommand('npm', ['run', 'test:coverage']);

        log(`\n${colors.green}${colors.bright}✅ Coverage report generated!${colors.reset}`);
        log(`${colors.blue}📁 Check the coverage/ directory for detailed reports${colors.reset}\n`);

    } catch (error) {
        log(`\n${colors.red}${colors.bright}❌ Coverage generation failed!${colors.reset}`);
        log(`${colors.red}💥 Error: ${error.message}${colors.reset}\n`);

        process.exit(1);
    }
}

async function runWatch() {
    log(`\n${colors.cyan}${colors.bright}👀 Running Tests in Watch Mode${colors.reset}\n`);

    try {
        await runCommand('npm', ['run', 'test:watch']);

    } catch (error) {
        log(`\n${colors.red}${colors.bright}❌ Watch mode failed!${colors.reset}`);
        log(`${colors.red}💥 Error: ${error.message}${colors.reset}\n`);

        process.exit(1);
    }
}

function showHelp() {
    log(`\n${colors.cyan}${colors.bright}🧪 Test Runner Script${colors.reset}\n`);
    log(`${colors.bright}Usage:${colors.reset}`);
    log(`  node scripts/test.js [command] [options]\n`);

    log(`${colors.bright}Commands:${colors.reset}`);
    log(`  ${colors.green}unit${colors.reset}        Run unit tests only`);
    log(`  ${colors.green}integration${colors.reset} Run integration tests only`);
    log(`  ${colors.green}all${colors.reset}         Run all tests (default)`);
    log(`  ${colors.green}coverage${colors.reset}    Generate test coverage report`);
    log(`  ${colors.green}watch${colors.reset}       Run tests in watch mode`);
    log(`  ${colors.green}help${colors.reset}        Show this help message\n`);

    log(`${colors.bright}Examples:${colors.reset}`);
    log(`  node scripts/test.js unit`);
    log(`  node scripts/test.js integration`);
    log(`  node scripts/test.js coverage`);
    log(`  node scripts/test.js watch\n`);
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    const command = args[0] || 'all';

    switch (command) {
        case 'unit':
            await runTests('unit');
            break;
        case 'integration':
            await runTests('integration');
            break;
        case 'all':
            await runTests('all');
            break;
        case 'coverage':
            await runCoverage();
            break;
        case 'watch':
            await runWatch();
            break;
        case 'help':
        case '--help':
        case '-h':
            showHelp();
            break;
        default:
            log(`${colors.red}❌ Unknown command: ${command}${colors.reset}\n`);
            showHelp();
            process.exit(1);
    }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    log(`\n${colors.red}${colors.bright}💥 Uncaught Exception:${colors.reset}`);
    log(`${colors.red}${error.message}${colors.reset}\n`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    log(`\n${colors.red}${colors.bright}💥 Unhandled Rejection:${colors.reset}`);
    log(`${colors.red}${reason}${colors.reset}\n`);
    process.exit(1);
});

// Run the main function
main().catch((error) => {
    log(`\n${colors.red}${colors.bright}💥 Script Error:${colors.reset}`);
    log(`${colors.red}${error.message}${colors.reset}\n`);
    process.exit(1);
});



